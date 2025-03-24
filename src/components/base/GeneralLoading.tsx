import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  isLoading: boolean;
};

export default function GeneralLoading({ isLoading }: Props) {
  return (
    <>
      {isLoading && (
        <div className="fixed z-10 h-full w-full bg-black bg-opacity-10 flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
    </>
  );
}
