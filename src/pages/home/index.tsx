import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { CiMobile4 } from "react-icons/ci";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { MdOutlineCamera } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { IoIosLaptop } from "react-icons/io";
import Card from "../../components/Card";
import Swipper from "../../components/Swiper";
import Pagination from "../../components/Pagination";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<[]>([]);
  const [category, setCategory] = useState<string>("phone");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage: number = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function getProduct() {
    axios
      .get("https://virtserver.swaggerhub.com/L3NONEONE_1/EcommerceAppProject/1.0.0/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data.Product);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProduct();
  }, [category]);

  return (
    <Layout>
      <div className="mx-[100px] my-[50px]">
        <div className="h-[350px] mb-20">
          <Swipper />
        </div>
        <h1 className="text-red-500 font-semibold ps-5 border-s-[15px] border-red-500 text-lg mb-5">Categories</h1>
        <h1 className="text-3xl font-bold mb-5">Browse By Category</h1>
        <div className="flex gap-auto justify-between flex-wrap">
          <div onClick={() => setCategory("phone")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <CiMobile4 className="text-5xl" />
            <h1 className="text-center">Phones</h1>
          </div>
          <div onClick={() => setCategory("computer")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <HiOutlineComputerDesktop className="text-5xl" />
            <h1 className="text-center">Computers</h1>
          </div>
          <div onClick={() => setCategory("camera")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <MdOutlineCamera className="text-5xl" />
            <h1 className="text-center">Cameras</h1>
          </div>
          <div onClick={() => setCategory("smartwatch")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <BsSmartwatch className="text-5xl" />
            <h1 className="text-center">Smartwatch</h1>
          </div>
          <div onClick={() => setCategory("television")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <PiTelevisionSimpleLight className="text-5xl" />
            <h1 className="text-center">Television</h1>
          </div>
          <div onClick={() => setCategory("laptop")} className="w-[170px] h-[145px] border-2 rounded-md border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5">
            <IoIosLaptop className="text-5xl" />
            <h1 className="text-center">Laptop</h1>
          </div>
        </div>
        <div className="grid grid-cols-4 my-5 gap-5">
          {records &&
            records.map((item: any, index: number) => {
              if (item.category == category) {
                return <Card key={index} thumbnail={item.photo_product} title={item.name} price={item.price} />;
              }
            })}
        </div>
        <div className="flex justify-center">
          {/* <Pagination data={products} /> */}
          <div>
            <ul className="flex gap-2">
              <li className="h-[35px] w-[70px] relative rounded-sm hover:bg-black hover:text-white border-2 border-slate-300 cursor-pointer" onClick={prePage}>
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Back</p>
              </li>
              {numbers.map((n: number, i: number) => (
                <li className="h-[35px] w-[35px] relative rounded-sm hover:bg-black hover:text-white border-2 border-slate-300 cursor-pointer" key={i} onClick={() => changeCPage(n)}>
                  <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{n}</p>
                </li>
              ))}
              <li className="h-[35px] w-[70px] relative rounded-sm hover:bg-black hover:text-white border-2 border-slate-300 cursor-pointer" onClick={nextPage}>
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Next</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default Home;