import './globals.css'

// This is a reserved const name used to configure the <head> config 
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

// layout.js are the wrapper of the page.js, and thats works for all pages automatically if you want to add more layouts
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
