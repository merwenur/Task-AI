import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="/logo-white.png"
            alt="Commafusion Logo"
            className="object-contain -ml-2 -mt-3"
            width={200}
            height={50}
          />
          <p className="text-sm">
            Commafusion is an AI-powered content management system designed to
            simplify and enhance e-commerce product content management.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Stay updated with our latest features and releases.
          </p>
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2023 Commafusion. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#" className="text-gray-300 hover:text-white">
            <FacebookIcon className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white">
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white">
            <InstagramIcon className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white">
            <LinkedinIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
