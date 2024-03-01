import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <article className="max-w-[800px]">
        <Link href="/auth/login" className="inline-block mb-4">
          Back to login page
        </Link>
        <h1>Demo accounts</h1>
        <p>
          These are some accounts with different permissions. Feel free to use
          them, <strong>their password is the same as their username.</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>alpha</td>
              <td>Create, read, update, delete</td>
            </tr>
            <tr>
              <td>beta</td>
              <td>Read, update</td>
            </tr>
            <tr>
              <td>charlie</td>
              <td>Read</td>
            </tr>
          </tbody>
        </table>
      </article>
    </main>
  );
}
