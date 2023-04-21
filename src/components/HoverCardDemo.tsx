import * as HoverCard from '@radix-ui/react-hover-card';

export function HoverCardDemo() {

  return (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
        href="https://twitter.com/radix_ui"
        target="_blank"
        rel="noreferrer noopener"
      >
        <p className='font-bold'>Andrii</p>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        sideOffset={5}
      >
        <p className="text-gray-900 text-sm font-medium">Andrii</p>
        <p className="text-gray-500 text-sm">
          I'm a frontend developer from Ukraine who loves to build accessible, performant, and delightful user experiences.
        </p>
        <div className='flex'>
          <p className="text-gray-500 text-sm mt-2 mr-4">
            <a href='https://github.com/Andriy15' target='_blank'><img src="https://img.icons8.com/external-those-icons-flat-those-icons/24/null/external-GitHub-Logo-social-media-those-icons-flat-those-icons-2.png"/></a>
          </p>
          <p className="text-gray-500 text-sm mt-2 mr-4"> 
            <a href="https://twitter.com/AndrijCikulaj" target='_blank'><img src="https://img.icons8.com/material-sharp/24/null/twitter.png"/></a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            <a href="https://www.linkedin.com/in/%D0%B0%D0%BD%D0%B4%D1%80%D1%96%D0%B9-%D1%87%D0%B8%D0%BA%D1%83%D0%BB%D0%B0%D0%B9-2a686723b/?originalSubdomain=ua" target='_blank'><img src="https://img.icons8.com/material-sharp/24/null/linkedin.png"/></a>
            </p>  
        </div>
        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
  )
}
