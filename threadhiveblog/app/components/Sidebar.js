import Link from "next/link";

export default function SideBar() {
    return (
        <div className="grid grid-cols-6 pt-16">
            <div className="col-start-1 bg-[#EAC67A] fixed h-full w-1/6">
                <div className="grid grid-rows-3 p-4">
                    <div>
                        <Link href={`/home`} className="flex items-center p-3 m-3 hover:bg-white hover:shadow-lg border-0 rounded-md">
                            <img src="/assets/home.png" alt="Home" className="w-auto h-8 mr-2" />หน้าแรก
                        </Link>
                    </div>
                    <div>
                        <Link href={`/user`} className="flex items-center p-3 m-3 hover:bg-white hover:shadow-lg border-0 rounded-md">
                            <img src="/assets/profile.png" alt="Home" className="w-auto h-8 mr-2" />โพสต์ของฉัน
                        </Link>
                    </div>
                    <div>
                        <Link href={`/home/post`} className="flex items-center p-3 m-3 hover:bg-white hover:shadow-lg border-0 rounded-md">
                            <img src="/assets/newPost.png" alt="Home" className="w-8 h-8 mr-2" />เขียนโพสต์
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}