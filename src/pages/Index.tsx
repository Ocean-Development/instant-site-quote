
import Layout from '@/components/Layout';
import QuoteCalculator from '@/components/QuoteCalculator';

const Index = () => {
  return (
    <Layout>
      <div className="py-8 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold md:text-5xl">
            Get an <span className="gradient-text">Instant Quote</span> for Your Website Project
          </h1>
          <p className="text-xl text-muted-foreground">
            Fill out the form below to receive a detailed estimate for your website development project in seconds.
          </p>
        </section>

        <QuoteCalculator />
      </div>
    </Layout>
  );
};

export default Index;
