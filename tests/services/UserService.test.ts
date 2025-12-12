import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserServiceImpl } from '/src/services/UserService';
import type { User } from '/src/models/User';

describe('UserServiceImpl', () => {
  let userService: UserServiceImpl;
  let mockLocalStorage: Record<string, string | null>;
  let originalLocalStorage: typeof globalThis.localStorage;
  let originalFetch: typeof globalThis.fetch;
  let originalDateNow: typeof Date.now;

  const sampleUsers: User[] = [
    {
      id: '1',
      email: 'test1@example.com',
      password: 'pass1',
      firstName: 'Test',
      lastName: 'One',
      avatar: 'avatar1.png',
      role: 'user',
      hospital: 'Hospital A',
      specialty: 'Cardiology',
    },
    {
      id: '2',
      email: 'test2@example.com',
      password: 'pass2',
      firstName: 'Test',
      lastName: 'Two',
      avatar: 'avatar2.png',
      role: 'admin',
      hospital: 'Hospital B',
      specialty: 'Neurology',
    },
  ];

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {};
    originalLocalStorage = globalThis.localStorage;
    globalThis.localStorage = {
      getItem: vi.fn((key: string) => mockLocalStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    } as any;

    // Mock fetch
    originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn();

    // Mock Date.now
    originalDateNow = Date.now;
    Date.now = vi.fn(() => 1234567890);

    userService = new UserServiceImpl();
  });

  afterEach(() => {
    globalThis.localStorage = originalLocalStorage;
    globalThis.fetch = originalFetch;
    Date.now = originalDateNow;
    vi.restoreAllMocks();
  });

  it('should_return_user_when_email_exists_in_local_storage', async () => {
    mockLocalStorage['users'] = JSON.stringify(sampleUsers);
    const user = await userService.getUserByEmail('test1@example.com');
    expect(user).toMatchObject(sampleUsers[0]);
  });

  it('should_return_all_users_from_remote_when_local_storage_empty', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => sampleUsers,
    });
    mockLocalStorage['users'] = null;
    const users = await userService.getUsers();
    expect(users).toEqual(sampleUsers);
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify(sampleUsers));
  });

  it('should_add_new_user_and_persist_to_local_storage', async () => {
    mockLocalStorage['users'] = JSON.stringify([]);
    const newUser: User = {
      email: 'newuser@example.com',
      password: 'newpass',
      firstName: 'New',
      lastName: 'User',
      avatar: 'avatar3.png',
      role: 'user',
      hospital: 'Hospital C',
      specialty: 'Oncology',
    };
    await userService.addnewUser(newUser);
    const storedUsers = JSON.parse(mockLocalStorage['users']!);
    expect(storedUsers.length).toBe(1);
    expect(storedUsers[0]).toMatchObject({
      ...newUser,
      id: '1234567890',
    });
  });

  it('should_throw_error_when_user_email_not_found', async () => {
    mockLocalStorage['users'] = JSON.stringify(sampleUsers);
    await expect(userService.getUserByEmail('notfound@example.com')).rejects.toThrow('user is not found');
  });

  it('should_throw_error_when_adding_duplicate_user', async () => {
    mockLocalStorage['users'] = JSON.stringify(sampleUsers);
    const duplicateUser: User = {
      email: 'test1@example.com',
      password: 'pass1',
      firstName: 'Test',
      lastName: 'One',
      avatar: 'avatar1.png',
      role: 'user',
      hospital: 'Hospital A',
      specialty: 'Cardiology',
    };
    await expect(userService.addnewUser(duplicateUser)).rejects.toThrow('this account already exist');
  });

  it('should_throw_error_when_fetching_users_fails', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });
    mockLocalStorage['users'] = null;
    await expect(userService.getUsers()).rejects.toThrow('Failed to fetch data: Internal Server Error');
  });

  it('should_return_new_array_instance_when_getting_users', async () => {
    mockLocalStorage['users'] = JSON.stringify(sampleUsers);
    const users = await userService.getUsers();
    expect(users).toEqual(sampleUsers);
    expect(users).not.toBe((userService as any).users);
    users[0].email = 'changed@example.com';
    expect((userService as any).users[0].email).toBe('test1@example.com');
  });

  it('should_handle_invalid_json_in_local_storage', async () => {
    mockLocalStorage['users'] = 'invalid-json';
    await expect(userService.getUsers()).rejects.toThrow();
  });
});