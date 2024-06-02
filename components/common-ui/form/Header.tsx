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
  logo?: boolean
}

export default function Header(props: HeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex justify-center">
        {props.logo &&<Logo
          src="/logo/logo.svg"
          width={230}
          height={20}
          className="flex justify-center p-10"
        />}
      </div>
      <h2 className="text-center text-3xl font-extrabold text-gray-700">
        {props.heading}
      </h2>
      <p className="mt-2 text-center text-lg text-gray-500">
        {props.paragraph}{" "}
        {props.linkUrl && props.linkName && (
          <Link
            href={props.linkUrl}
            className="font-medium text-pri hover:underline"
          >
            {props.linkName}
          </Link>
        )}
      </p>
    </div>
  );
}
