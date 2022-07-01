import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/router';
import { useCallback } from 'react';


const Session = (...props: any[]) => {
  const router = useRouter();
  const { id } = router.query;

  const onLoad = useCallback(async () => {
    let { data } = await supabase
      .from('upload_session')
      .select("file_urls")
      .eq("id", id)
    console.log(data)
  }, []);

  onLoad();
  return <div>Your Download</div>
}

export async function getStaticPaths() {
  const { data: upload_session } = await supabase
    .from('upload_session')
    .select('*')

  if (!upload_session) return;

  return {
    paths: [
      { params: { id: upload_session[0]!.id } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  console.log(params)
  const { data: upload_session } = await supabase
    .from('upload_session')
    .select("*")
    .eq("id", params.id)

  if (params.id) {
    return {
      props: { upload_session },
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }


}

export default Session
