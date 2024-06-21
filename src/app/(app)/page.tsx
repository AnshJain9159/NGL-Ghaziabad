'use client';

import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center min-h-screen px-4 md:px-12 py-12 bg-blue-100 text-gray-800">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900">
            Dive into the World of Anonymous Abuses
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-blue-700">
            NGL-Ghaziabad - Where your identity remains a secret but abuses are personal.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-2xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-800">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-gray-700">{message.content}</p>
                      <p className="text-xs text-gray-500">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
            
      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white w-full">
        © {currentYear} NGL-Ghaziabad. All rights reserved.
        <br />
        <p className='mt-2'>Made by <a href="https://github.com/AnshJain9159/NGL-Ghaziabad" className='text-yellow-500'>Ansh Jain</a></p>
      </footer>
    </>
  );
}
