import React from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
};

const HomePage = () => {
  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;
