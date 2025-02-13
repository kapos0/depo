import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api/products";

export type ProductType = {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    updatedAt: string;
    createdAt: string;
};

export const useProductStore = create<{
    products: ProductType[] | [];
    loading: boolean;
    error: string | null;
    currentProduct: ProductType | null;

    formData: {
        name: string;
        image: string;
        description: string;
        price: number;
    };
    setFormData: (field: string, value: string | number) => void;
    resetForm: () => void;

    fetchProducts: () => Promise<void>;
    addProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}>((set, get) => ({
    products: [] as ProductType[],
    loading: false,
    error: null,
    currentProduct: null,

    formData: {
        name: "",
        image: "",
        description: "",
        price: 0.0,
    },
    setFormData: (field: string, value: string | number) => {
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        }));
    },
    resetForm: () => {
        set({
            formData: { name: "", description: "", price: 0.0, image: "" },
        });
    },
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(BASE_URL);
            set({
                products: response.data.data,
                loading: false,
                error: null,
                currentProduct: null,
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429)
                set({
                    error: "Rate limit exceeded",
                    loading: false,
                    products: [],
                    currentProduct: null,
                });
            else
                set({
                    error: (error as Error).message,
                    loading: false,
                    products: [],
                    currentProduct: null,
                });
            toast.error("Bir şeyler ters gitti daha sonra tekrar deneyiniz");
        } finally {
            set({ loading: false });
        }
    },
    addProduct: async (e) => {
        e.preventDefault();
        set({ loading: true, error: null });
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Ürün Başarıyla Eklendi");
            if (document.getElementById("add_product_modal") !== null)
                (
                    document.getElementById(
                        "add_product_modal"
                    ) as HTMLDialogElement
                )?.close();
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
            toast.error("Bir şeyler ters gitti daha sonra tekrar deneyiniz");
        } finally {
            set({ loading: false });
        }
    },
    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            set((prev) => ({
                products: prev.products.filter(
                    (product: ProductType) => product._id !== id
                ),
                loading: false,
                error: null,
            }));
            toast.success("Ürün Başarıyla Silindi");
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
            toast.error("Bir şeyler ters gitti daha sonra tekrar deneyiniz");
        } finally {
            set({ loading: false });
        }
    },
}));
