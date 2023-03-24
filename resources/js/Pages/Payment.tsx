import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import { React, useCallback, useEffect, useMemo, useState } from 'react'
import hljs from 'highlight.js';

export default function Payment() {

  const [todos, setTodos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = ['green', 'indigo', 'red']

  const fetchTodos = async () => {
    try {
      const response = await fetch('/snippets');
      const data = await response.json();
      setTodos(data);
      console.log(data);

      setTimeout(function() {
        document.querySelectorAll('code').forEach(el => {
          console.log(el)
          // then highlight each
          hljs.highlightElement(el);
        });

      }, 100)


    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchTodos();
    
  }, [])

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">

            
          {todos?.map((todoItem) => {
        return (
          <div key={todoItem.id} className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-white">{todoItem.category.name}</span>
                    <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-white title-font mb-2">{todoItem.title}</h2>
                    <pre className="bg-gray-100 p-4 rounded-md">
                      <code className="text-sm font-mono code">
                        {todoItem.content}
                      </code>
                    </pre>

                    {todoItem.tags?.map((tag, index) => {
                      
                        var color = colors[(Math.random()*colors.length)|0] 
                      
                      return (<span key={index} className={"mt-2 ml-2 inline-flex items-center rounded-md border-2 border-"+color+"-200 bg-"+color+"-200 px-2 py-1 text-sm font-semibold text-"+color+"-600 shadow-sm "}>
                {tag.name}
              </span>)
                })}



                  </div>
                </div>
            </div>
        );
      })}



          </div>
        </div>
      </div>
    </AppLayout>
  );
}
