import Form from "next/form"
import SearchFormReset from "@/components/subComponents/SearchFormReset"
import { Search } from "lucide-react"

export default function SearchForm({ query }: { query?: string }) {
    return (
        <Form
            action="/"
            scroll={false}
            id="searchEl"
            className="search-form"
        >
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder="lorem ipsum dolor sit amet."
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button
                    type="submit"
                    className="search-btn text-white"
                >
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    )
}
