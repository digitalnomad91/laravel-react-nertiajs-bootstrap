import React from 'react';

import { Link } from '@inertiajs/react';


export default function Pagination({ links }) {
    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 rounded hover:bg-white  focus:text-primary bg-blue-700 text-white";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4  rounded bg-gray-700  focus:text-primary";
        }
    }
    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (

                            link.url === null ?
                                    (<div key={key}
                                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 rounded"
                                        >{link.label.replace(/&raquo;/gi, '').replace(/&laquo;/gi, '')}</div>) :

                                    (<Link key={key}
                                                className={getClassName(link.active)}
                                                href={ link.url }
                                            >{link.label.replace(/&raquo;/gi, '').replace(/&laquo;/gi, '')}</Link>)
                                    ))}
                </div>
            </div>
        )
    );
}