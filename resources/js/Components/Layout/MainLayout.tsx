import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import FlashMessages from "../FlashMessages";

interface MainLayoutProps {
    children?: ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps) => {


    return (
        <div className="flex flex-col min-h-screen">
            <FlashMessages />
            <Header />
            <main >{children}</main>
            <Footer />
        </div>
    )
}

export default MainLayout
