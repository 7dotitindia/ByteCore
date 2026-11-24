import { listUsers } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { updateUserRoleAction } from "./actions";

const roles = ["admin", "editor", "author", "viewer"] as const;

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const users = await listUsers(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Users &amp; Roles</h1>

      {users.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">No users yet.</p>
      ) : (
        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="py-2 font-medium">Email</th>
              <th className="py-2 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-none">
                <td className="py-3 text-text">{user.email}</td>
                <td className="py-3">
                  <form action={updateUserRoleAction} className="flex items-center gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select
                      name="role"
                      defaultValue={user.role}
                      className="border border-border bg-bg px-2 py-1 text-sm text-text outline-none focus:border-accent"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs font-medium text-accent hover:opacity-80">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
