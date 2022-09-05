import Head from 'next/head'

// Logo
import Image from 'next/image'
// CSS
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'
// Components
import { Input } from '../components/ui/Input/Input'
import { Button } from '../components/ui/Button/Button'

// Next Link
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Sujeito Pizza - Faça seu login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeiro Pizzaria' />

        <div className={styles.login}>
          <form>
            <Input
              placeholder='Digite seu e-mail'
              type='email'
            />

            <Input
              placeholder='Digite sua senha'
              type='password'
            />


            <Button 
            type='submit'
            loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link href='/signup'>
          <a className={styles.text}>
            Não possui uma conta? <b>Cadastre-se</b>
          </a>
          </Link>
        </div>
      </div>
    </>
  )
}
