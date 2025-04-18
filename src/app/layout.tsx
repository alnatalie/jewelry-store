import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LinksNav, Nav } from "@/components/navigation/nav";
import { Footer } from "@/components/footer";
import { Box, CssBaseline } from "@mui/material";
import RunningText from "@/components/run-text";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RunningText/>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >

          <header>
            <div>
              <Nav />
              <LinksNav />
            </div>
          </header>
          <Box
            component="main"
            sx={{
              flexGrow: 1, 
              py: 3, 
            }}
          >
            <main>{children}</main>

          </Box>
            <Footer />
        </Box>
      </body>
    </html>
  );
}
