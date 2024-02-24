import { redirect } from 'next/navigation'
import Navbar from '@/components/shared/navbar';
import React from 'react';

const HomePage = ({children}: {children: React.ReactNode}) => {

  //redirect('/login');

  return <>     
          <div>
            <header>
              <Navbar />
            </header>
            <main className='container'>
              {children}
            </main>
          </div>
  </>

}

export default HomePage;
