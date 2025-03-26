import { Fragment, useState, useEffect } from "react";
import Layout from "../../components/general/Layout";
import { useRouter } from "next/router";
import { UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import {
  BookOpenIcon,
  CalendarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
// import tokenRefresh from "../../lib/tokenRefresh";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tab() {
  const [currentPage, setCurrentPage] = useState();
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   refresh();
  // }, []);

  // async function refresh() {
  //   await tokenRefresh(session);
  // }

  const [pillTabs, setPillTabs] = useState([
    {
      name: "Add Movie",
      id: 4,
      code: "add-movie",
      href: "/admin/add-movie",
      icon: CalendarIcon,
      current: false,
    },
    {
      name: "Delete Movie",
      id: 5,
      code: "delete-movie",
      href: "/admin/delete-movie",
      icon: CalendarIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    const { tab } = router.query;

    const updatedTabs = pillTabs.map((pill) => {
      if (tab == pill.code) {
        return { ...pill, current: true };
      } else {
        return { ...pill, current: false };
      }
    });

    setPillTabs(updatedTabs);

    if (tab == "add-movie") {
      const AddMovie = dynamic(() => import("../../components/movie/AddMovie"));
      setCurrentPage(<AddMovie />);
    } else if (tab == "delete-movie") {
      const DeleteMovie = dynamic(() =>
        import("../../components/movie/DeleteMovie")
      );
      setCurrentPage(<DeleteMovie />);
    }
  }, [router]);

  return (
    <Layout>
      <div className="bg-white px-2  shadow-sm sticky top-0 z-40"></div>

      {currentPage}
    </Layout>
  );
}
