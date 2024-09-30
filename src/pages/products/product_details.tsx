import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";
import { IResponse } from "../../interfaces/IResponse";
import { product_details } from "../../api/calls/products/product_details";
import { IProductDetails } from "../../interfaces/IProductDetails";
import ButtonComponent from "../../components/button";
import { ShimmerContentBlock } from "shimmer-effects-react";
import StartComponent from "../../components/star";

export default function ProductDetailsPage() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = () => {
    if (!product_id) return;
    setIsLoading(true);
    product_details(product_id)
      .then((res: IResponse) => {
        setIsLoading(false);

        if (res.success) {
          setProduct(res.content);
        } else {
          alert(res.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="flex flex-col gap-4 max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div>
            <ButtonComponent
              {...{
                title: "Back",
                onClick: () => {
                  navigate(-1);
                },
                state: "outlined",
              }}
            />
          </div>
          {isLoading ? (
            <ShimmerContentBlock
              mode="light"
              rounded={0}
              items={1}
              itemsGap={20}
              thumbnailHeight={300}
              thumbnailWidth={300}
              contentDetailsPosition="center"
              thumbnailBorder={1}
            />
          ) : (
            <div className="">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                  {product?.thumbnail && (
                    <img
                      className="w-full dark:hidden"
                      src={product.thumbnail}
                      alt=""
                    />
                  )}
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {product?.title}
                  </h1>
                  <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                      R{product?.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1">
                        {[
                          ...Array(parseInt(`${product?.rating ?? 1}`)).keys(),
                        ].map((x) => (
                          <StartComponent />
                        ))}
                      </div>
                      <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                        ({product?.rating})
                      </p>
                      <a
                        href="#"
                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                      >
                        {product?.reviews?.length} Reviews
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 my-4">
                    <div className="">
                      <ButtonComponent
                        {...{
                          title: "Add to favorites",
                          onClick: () => {},
                          state: "outlined",
                        }}
                      />
                    </div>

                    <div className="">
                      <ButtonComponent
                        {...{
                          title: "Add to cart",
                          onClick: () => {},
                        }}
                      />
                    </div>
                  </div>

                  <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                  <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
