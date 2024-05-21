import Image from "next/image";

interface LogoProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

const Logo = (props: LogoProps) => {
  return (
    <div className={props.className}>
      <Image
        src={props.src}
        alt="Logo"
        width={props.width}
        height={props.height}
      />
    </div>
  );
};

export default Logo;
