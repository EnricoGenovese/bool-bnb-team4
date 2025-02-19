import { useGlobalContext } from "../contexts/GlobalContext";
import style from "../styles/Pagination.module.css";

export default function Pagination() {
    const { handlePageChange, page, numPages } = useGlobalContext();

    // Funzione per generare i numeri di pagina in base alla logica richiesta
    const getPageNumbers = () => {
        let pages = [];

        if (numPages <= 3) {
            // Se il numero di pagine è 3 o inferiore, mostra tutte le pagine
            for (let i = 1; i <= numPages; i++) {
                pages.push(i);
            }
        } else {
            if (page === 1) {
                // Da pagina 1 a 2: Mostra 1, 2, 3, ... ultima pagina
                pages = [1, 2, 3, '...', numPages];
            } else if (page === 2) {
                // Da pagina 2: Mostra 1, 2, 3, ... ultima pagina
                pages = [1, 2, 3, '...', numPages];
            } else if (page === numPages - 1) {
                // Da penultima pagina: Mostra 1, ... pagina-1, pagina, pagina+1, ultima pagina
                pages = [1, '...', numPages - 2, numPages - 1, numPages];
            } else if (page === numPages) {
                // Da ultima pagina-1 a ultima pagina: Mostra 1, ... pagina-1, pagina
                pages = [1, '...', numPages - 1, numPages];
            } else if (page >= 3 && page < numPages - 1) {
                // Da pagina 3 a penultima pagina: Mostra 1, ... pagina-1, pagina, pagina+1, ... ultima pagina
                pages = [1, '...', page - 1, page, page + 1, '...', numPages];
            }
        }

        return pages;
    };

    return (
        <nav className="col-12 d-flex justify-content-center">
            <ul className="pagination">
                {/* Pulsante per andare alla pagina precedente */}
                <li className={`page-item ${page <= 1 ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                </li>

                {/* Mostra i numeri di pagina */}
                {getPageNumbers().map((num, index) => (
                    <li
                        className={`page-item ${num === page ? "" : `${style.dark}`} mx-2`}
                        aria-current="page"
                        key={self.crypto.randomUUID()}
                    >
                        {/* Se è '...', non è cliccabile */}
                        {num === '...' ? (
                            <button className={`page-link ${style.pageBtn}`} disabled>
                                {num}
                            </button>
                        ) : (
                            <button
                                className={`page-link ${num === page ? `${style.active}` : `${style.dark}`} ${style.pageBtn}`}
                                onClick={() => handlePageChange(num)}
                            >
                                {num}
                            </button>
                        )}
                    </li>
                ))}

                {/* Pulsante per andare alla pagina successiva */}
                <li className={`page-item ${page >= numPages ? "disabled" : ""} px-5`}>
                    <button
                        className={`page-link ${style.pageBtn}`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
