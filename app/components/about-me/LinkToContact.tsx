"use client"

import Link from 'next/link';
import RollingButton from '../RollingButton';

export default function LinkToContact() {

  return (
    <div className="flex justify-center py-16 pb-32">
      <Link href="/contact">
        <RollingButton text="CONTACT" />
      </Link>
    </div>
  )
}
