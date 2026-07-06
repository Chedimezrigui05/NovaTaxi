import { RoleLoginForm } from '@/components/auth/RoleLoginForm';

export default function ClientLoginPage() {
  return (
    <RoleLoginForm
      role="client"
      title="Client Sign In"
      subtitle="Access your passenger space and book rides"
      cardTitle="Client Login"
      cardDescription="Use your client account to continue booking"
      redirectPath="/dashboard/clients"
    />
  );
}
