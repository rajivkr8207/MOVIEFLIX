import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../stores/slices/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);

    const isDark = theme === "dark";
    const query = useSelector((state) => state.search.query);
    const navigate = useNavigate()
    const handleSearch = (e) => {
        dispatch(setQuery(e.target.value))
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useDebounce(() => {
            if (query) {
                navigate(`/search?q=${query}`);
            }
        }, 500, [query]);
    };
    return (
        <div
            className={`md:hidden block  mx-auto mt-7 w-80   ${isDark ? "text-white" : "text-black"} `}
        >
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    value={query}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Search movies..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none"
                />
            </div>
        </div>
    )
}

export default SearchBox