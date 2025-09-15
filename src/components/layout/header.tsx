"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between text-black font-space-grotesk font-bold"
            style={{
              borderBottomColor: 'rgba(255, 255, 255, 0.1)',
              borderBottomStyle: 'solid',
              borderBottomWidth: '0px',
              borderLeftColor: 'rgba(255, 255, 255, 0.1)',
              borderLeftStyle: 'solid',
              borderLeftWidth: '0px',
              borderRightColor: 'rgba(255, 255, 255, 0.1)',
              borderRightStyle: 'solid',
              borderRightWidth: '0px',
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
              borderTopStyle: 'solid',
              borderTopWidth: '0px',
              boxSizing: 'border-box',
              color: 'rgb(0, 0, 0)',
              colorScheme: 'dark',
              display: 'flex',
              fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
              fontFeatureSettings: 'normal',
              fontVariationSettings: 'normal',
              fontWeight: '700',
              height: '68px',
              justifyContent: 'space-between',
              lineHeight: '25.5px',
              marginBottom: '0px',
              marginLeft: '0px',
              marginRight: '0px',
              marginTop: '0px',
              outlineColor: 'rgb(0, 0, 0)',
              paddingBottom: '0px',
              paddingLeft: '0px',
              paddingRight: '0px',
              paddingTop: '0px',
              position: 'relative',
              tabSize: '4',
              textSizeAdjust: '100%',
              unicodeBidi: 'isolate',
              width: '708px',
              zIndex: '10',
              WebkitFontSmoothing: 'antialiased',
              WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
            }}>
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg overflow-hidden">
                  <Image
                    src="/yeshi.logo.jpg"
                    alt="YESHI Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-space-grotesk font-bold text-black"
                  style={{
                    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '0px',
                    borderImageOutset: '0',
                    borderImageRepeat: 'stretch',
                    borderImageSlice: '100%',
                    borderImageSource: 'none',
                    borderImageWidth: '1',
                    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
                    borderLeftStyle: 'solid',
                    borderLeftWidth: '0px',
                    borderRightColor: 'rgba(255, 255, 255, 0.1)',
                    borderRightStyle: 'solid',
                    borderRightWidth: '0px',
                    borderTopColor: 'rgba(255, 255, 255, 0.1)',
                    borderTopStyle: 'solid',
                    borderTopWidth: '0px',
                    boxSizing: 'border-box',
                    color: 'rgb(0, 0, 0)',
                    colorScheme: 'dark',
                    cursor: 'pointer',
                    display: 'block',
                    fill: 'rgb(0, 0, 0)',
                    fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
                    fontFeatureSettings: 'normal',
                    fontVariationSettings: 'normal',
                    fontWeight: '700',
                    height: '23.6328px',
                    lineHeight: '25.5px',
                    marginBottom: '0px',
                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '0px',
                    outlineColor: 'rgb(0, 0, 0)',
                    overflowClipMargin: 'content-box',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    paddingBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    tabSize: '4',
                    textSizeAdjust: '100%',
                    verticalAlign: 'middle',
                    width: '128px',
                    WebkitFontSmoothing: 'antialiased',
                    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
                  }}>
                  YESHI
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between text-black font-space-grotesk font-bold"
          style={{
            borderBottomColor: 'rgba(255, 255, 255, 0.1)',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0px',
            borderLeftColor: 'rgba(255, 255, 255, 0.1)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '0px',
            borderRightColor: 'rgba(255, 255, 255, 0.1)',
            borderRightStyle: 'solid',
            borderRightWidth: '0px',
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            borderTopStyle: 'solid',
            borderTopWidth: '0px',
            boxSizing: 'border-box',
            color: 'rgb(0, 0, 0)',
            colorScheme: 'dark',
            display: 'flex',
            fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
            fontFeatureSettings: 'normal',
            fontVariationSettings: 'normal',
            fontWeight: '700',
            height: '68px',
            justifyContent: 'space-between',
            lineHeight: '25.5px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            marginTop: '0px',
            outlineColor: 'rgb(0, 0, 0)',
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '0px',
            position: 'relative',
            tabSize: '4',
            textSizeAdjust: '100%',
            unicodeBidi: 'isolate',
            width: '708px',
            zIndex: '10',
            WebkitFontSmoothing: 'antialiased',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
          }}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg overflow-hidden">
                <Image
                  src="/yeshi.logo.jpg"
                  alt="YESHI Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-space-grotesk font-bold text-black"
                style={{
                  borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: '0px',
                  borderImageOutset: '0',
                  borderImageRepeat: 'stretch',
                  borderImageSlice: '100%',
                  borderImageSource: 'none',
                  borderImageWidth: '1',
                  borderLeftColor: 'rgba(255, 255, 255, 0.1)',
                  borderLeftStyle: 'solid',
                  borderLeftWidth: '0px',
                  borderRightColor: 'rgba(255, 255, 255, 0.1)',
                  borderRightStyle: 'solid',
                  borderRightWidth: '0px',
                  borderTopColor: 'rgba(255, 255, 255, 0.1)',
                  borderTopStyle: 'solid',
                  borderTopWidth: '0px',
                  boxSizing: 'border-box',
                  color: 'rgb(0, 0, 0)',
                  colorScheme: 'dark',
                  cursor: 'pointer',
                  display: 'block',
                  fill: 'rgb(0, 0, 0)',
                  fontFamily: '"Space Grotesk", "Space Grotesk Fallback"',
                  fontFeatureSettings: 'normal',
                  fontVariationSettings: 'normal',
                  fontWeight: '700',
                  height: '23.6328px',
                  lineHeight: '25.5px',
                  marginBottom: '0px',
                  marginLeft: '0px',
                  marginRight: '0px',
                  marginTop: '0px',
                  outlineColor: 'rgb(0, 0, 0)',
                  overflowClipMargin: 'content-box',
                  overflowX: 'hidden',
                  overflowY: 'hidden',
                  paddingBottom: '0px',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                  paddingTop: '0px',
                  tabSize: '4',
                  textSizeAdjust: '100%',
                  verticalAlign: 'middle',
                  width: '128px',
                  WebkitFontSmoothing: 'antialiased',
                  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
                }}>
                YESHI
              </span>
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
}
