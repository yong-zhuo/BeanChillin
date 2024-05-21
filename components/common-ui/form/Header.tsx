import Link from "next/link";
import Logo from "@/components/common-ui/logo/Logo";

/**
 * Header can be used for Onboarding Pages, disclude linkname and linkUrl
 */

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName?: string;
  linkUrl?: string;
}

export default function Header(props: HeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex justify-center">
        <Logo
          src="/logo/logo.png"
          width={200}
          height={200}
          className="flex justify-center py-6"
        />
      </div>
      <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
        {props.heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {props.paragraph}{" "}
        {props.linkUrl && props.linkName && (
          <Link
            href={props.linkUrl}
            className="font-medium text-primary hover:underline"
          >
            {props.linkName}
          </Link>
        )}
      </p>
    </div>
  );
}
