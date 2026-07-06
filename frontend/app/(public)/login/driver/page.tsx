import { RoleLoginForm } from '@/components/auth/RoleLoginForm';

export default function DriverLoginPage() {
  return (
    <RoleLoginForm
      role="driver"
      title="Driver Sign In"
      subtitle="Access your driver space and manage your rides"
      cardTitle="Driver Login"
      cardDescription="Use your driver account to manage availability"
      redirectPath="/dashboard/drivers"
    />
  );
}
