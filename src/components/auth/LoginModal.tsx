"use client"
import React from 'react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react';


export default function LoginModal() {

  const handleLogin = async () => {
    signIn('google',{callbackUrl: '/dashboard', redirect: true})
  }
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button>Getting Started</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Welcome to QuickChat</DialogTitle>
      <DialogDescription>
        QuickChat makes it effortless to create effortless chat links using Nodejs, PostgreSql and Redis
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'} onClick={handleLogin}>

       <Image src="/images/google.png" alt="google_logo" width={25} height={25} className='mr-4' /> 
       Continue with Google
    </Button>
  </DialogContent>
</Dialog>
  )
}
