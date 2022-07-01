import Layout from "@/components/Layout";
import Dashboard from '../components/Dashboard';

const Home = () => {

  return <section className=''><Dashboard /></section>;
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
