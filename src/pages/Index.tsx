
import Layout from '@/components/Layout';
import QuoteCalculator from '@/components/QuoteCalculator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="hero-gradient py-20 mb-12">
        <div className="container mx-auto px-4 space-y-8">
          <section className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold md:text-5xl text-white">
              Dive Deeper <span className="text-blue-300">with</span> <br />
              <span className="text-blue-300">InstantQuote</span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Build your online legacy on the vast digital ocean.
              Get an instant quote for your website project in seconds.
            </p>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg rounded-full">
              Get started
            </Button>
          </section>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold md:text-4xl text-blue-300">
            Get an <span className="gradient-text">Instant Quote</span> for Your Website Project
          </h2>
          <p className="text-xl text-blue-100/80">
            Fill out the form below to receive a detailed estimate for your website development project in seconds.
          </p>
        </section>

        <QuoteCalculator />
      </div>
    </Layout>
  );
};

export default Index;
