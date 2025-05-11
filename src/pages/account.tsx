import { Car, Headset, LucideIcon, User, Users } from "lucide-react";
import { Card } from "../components/ui/card";
import { cn } from "../lib/utils";
import { useAccount } from "../hooks/use-account";

const Account: React.FC = () => {
  const data = {
    rider: {
      unverified: 1,
      active: 385,
      banned: 7,
    },
    driver: {
      pending: 4,
      active: 149,
      banned: 25,
    },
    web: {
      owner: 1,
      admin: 1,
      support: 3,
    },
  };

  const a = {
    r: data.rider.active + data.rider.unverified + data.rider.banned,
    d: data.driver.active + data.driver.pending + data.driver.banned,
    w: data.web.owner + data.web.admin + data.web.support,
  };
  const { accounts, counts, error, refetch, isLoading } = useAccount();

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 text-gray-800 dark:text-gray-200">
        Account Management
      </h1>
      <Card>
        <h2 className="text-gray-600 dark:text-gray-300">Overview</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          error && (
            <div className="flex">
              <p className="text-red-500">{error.message}, </p>
              <p className="text-blue-500" onClick={() => refetch()}>
                Try again
              </p>
            </div>
          )
        )}

        <div className="grid grid-cols-2 gap-2 mt-4">
          <CardItem
            LeftIcon={Users}
            array={[
              {
                title: "Rider",
                value: counts.riders,
              },
              {
                title: "Driver",
                value: counts.drivers,
              },
              {
                title: "System",
                value: counts.systems,
              },
            ]}
            title="All Accounts"
            content={counts.total + ""}
            description="my description"
            className="rounded-none"
          />
          <CardItem
            LeftIcon={Headset}
            array={[
              {
                title: "Owner",
                value: counts.system.owner,
              },
              {
                title: "Admin",
                value: counts.system.admin,
              },
              {
                title: "Support",
                value: counts.system.support,
              },
            ]}
            title="Web User"
            content={counts.systems + ""}
            description="my description"
            className="rounded-none"
          />
          <CardItem
            LeftIcon={User}
            array={[
              {
                title: "Active",
                value: counts.rider.active,
              },
              {
                title: "Unverified",
                value: counts.rider.unverified,
              },
              {
                title: "Banned",
                value: counts.rider.banned,
              },
            ]}
            title="Rider User"
            content={counts.riders + ""}
            description="my description"
            className="rounded-none"
          />
          <CardItem
            LeftIcon={Car}
            array={[
              {
                title: "Active",
                value: counts.driver.active,
              },
              {
                title: "Pending",
                value: counts.driver.pending,
              },
              {
                title: "Banned",
                value: counts.driver.banned,
              },
            ]}
            title="Driver User"
            content={counts.drivers + ""}
            description="my description"
            className="rounded-none"
          />
        </div>
      </Card>
      {/* <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardItem
            LeftIcon={DollarSign}
            title="All User"
            content="539"
            description="my description"
          />
          <CardItem
            LeftIcon={DollarSign}
            title="All User"
            content="539"
            description="my description"
          />
          <CardItem
            LeftIcon={DollarSign}
            title="All User"
            content="539"
            description="my description"
          />
          <CardItem
            LeftIcon={DollarSign}
            title="All User"
            content="539"
            description="my description"
          />
        </div>{" "}
        <Card className="col-span-2 lg:col-span-1">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Rider Account
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Total Account
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Đã hoàn thành
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                4545
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Đang chờ</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">
                7373
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Thất bại</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                362362
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Hoàn tiền
              </span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                37343734
              </span>
            </div>
          </div>
        </Card>
      </div> */}
    </div>
  );
};

export default Account;

function CardItem({
  LeftIcon,
  array,
  title,
  content,
  description,
  className,
}: {
  LeftIcon: LucideIcon;
  array?: { title: string; value: number }[];
  title: string;
  content: string;
  description?: string;
  className?: string;
}) {
  return (
    <Card className={cn("flex justify-between items-start", className)}>
      <div className="flex-1">
        <div className="inline-block bg-gray-100 dark:bg-gray-700 p-2 rounded-lg ">
          <LeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
        <h3 className="mb-1 text-gray-600 dark:text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {content}
        </p>
        <p className="text-xs">{description}</p>
      </div>
      <div className="w-1/2 pl-4 border-l border-slate-300">
        {array &&
          array.map((a, index) => (
            <div className="grid grid-cols-2 gap-10" key={index}>
              <span>{a.title}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {a.value}
              </span>
            </div>
          ))}
      </div>
    </Card>
  );
}
