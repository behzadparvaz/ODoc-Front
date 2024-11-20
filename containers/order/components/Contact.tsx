import Link from 'next/link';

const Contact = () => {
  return (
    <Link href={`tel:02196861727`}>
      <div className="py-3 px-4 text-content-primary text-base leading-6">
        تماس با پشتیبانی
      </div>
    </Link>
  );
};

export default Contact;
