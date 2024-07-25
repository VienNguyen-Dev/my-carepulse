import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointment } from "@/lib/actions/appointment.action";
import Image from "next/image";
import Link from "next/link";

const Admin = async () => {
  const appointment = await getRecentAppointment();
  return (
    <div className=" flex flex-col space-y-14 px-auto max-w-7xl">
      <header className="admin-header">
        <Link href={"/"}>
          <Image src={"/assets/icons/logo-full.svg"} width={120} height={280} alt="logo" className=" cursor-pointer" />
        </Link>
        <p className=" text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Wellcome, Admin 👋</h1>
          <p className=" text-dark-700">Start day with managing new appointments</p>
        </section>
        <section className="admin-stat">
          <StatCard count={appointment.scheduledCount} icon={"/assets/icons/appointments.svg"} label={"Total number of scheduled appointments"} type="appointments" />
          <StatCard count={appointment.pendingCount} icon={"/assets/icons/pending.svg"} label={"Total number of pending appointments"} type="pending" />
          <StatCard count={appointment.cancelledCount} icon={"/assets/icons/cancelled.svg"} label={"Total number of cancelled appointments"} type="cancelled" />
        </section>
        <DataTable columns={columns} data={appointment.documents} />
      </main>
    </div>
  );
};

export default Admin;
