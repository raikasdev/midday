import Image from "next/image";

type Props = {
  logo: string;
  customerName: string;
};

export function Logo({ logo, customerName }: Props) {
  return <Image src={logo} alt={customerName} width={78} height={78} />;
}
