import React from "react";
import RecentPosts from "@/components/RecentPosts";
import ToTheMySite from "@/components/ToTheMySite";

export default function Index() {
    return (
        <div className="flex flex-col justify-center items-center mb-5">
            <RecentPosts />
            <ToTheMySite />
        </div>
    );
}
