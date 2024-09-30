import React, { useEffect, useState } from "react";
import {
  get_products,
  IGetProductsRequest,
} from "../../api/calls/products/get_products";
import { IResponse } from "../../interfaces/IResponse";
import { IProduct } from "../../interfaces/IProduct";
import { ShimmerDiv } from "shimmer-effects-react";
import SerachBarComponent from "../../components/serach_bar";
import { useNavigate } from "react-router-dom";
import { PRODUCT_DETAILS_ROUTE } from "../../constants/routes";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (moreData && !isLoading) {
      getProducts();
    }
  }, [search]);

  const handleScroll = () => {
    const offsetHeight = document.documentElement.offsetHeight;
    const scrollTop = window.innerHeight + document.documentElement.scrollTop;
    if (scrollTop >= offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProducts = () => {
    const filter: IGetProductsRequest = { page };

    if (search) {
      filter.search = search;
    }

    setIsLoading(true);
    get_products(filter)
      .then((res: IResponse) => {
        setIsLoading(false);
        if (res.success) {
          setProducts((prevData: IProduct[]) => [...products, ...res.content]);
        } else {
          alert(res.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="bg-white">
      <div className="flex flex-col gap-4 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="w-full">
          <SerachBarComponent
            {...{
              onSubmitHandler: async (value: string) => {
                setProducts([]);
                setPage(1);
                setSearch(value);
              },
            }}
          />
        </div>
        <h2 className="sr-only">Products</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
              <ShimmerDiv mode="light" height={200} width={300} rounded={1} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products &&
              products?.map((x: IProduct, index: number) => (
                <a
                  onClick={() => {
                    navigate(`${PRODUCT_DETAILS_ROUTE}/${x.id}`);
                  }}
                  className="group"
                  key={index}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={x.thumbnail}
                      alt={x.title}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{x.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    R{x.price}
                  </p>
                </a>
              ))}
          </div>
        )}

        {!isLoading && products?.length === 0 && (
          <div>
            <p className="text-center">No products found!</p>
          </div>
        )}
      </div>
    </div>
  );
}
