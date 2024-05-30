import ResetForm from "@/components/user-auth/forget-password/ResetForm";

export const metadata = {
  title: "Reset Password| BeanChillin",
  description: "Reset your password here!",
};

const ResetToken = ({ params }: { params: { token: string } }) => {
  return <ResetForm params={params} />;
};

export default ResetToken;
