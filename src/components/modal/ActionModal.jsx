import cn from "clsx";
import { Button, Description, DialogTitle } from "@headlessui/react";

export const ActionModal = ({
  title,
  useIcon,
  description,
  mainBtnLabel,
  mainBtnClassName,
  secondaryBtnLabel,
  secondaryBtnClassName,
  action,
  closeModal,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {useIcon && (
          <span className="h-10 w-10 overflow-hidden">
            <img className="h-10 w-10" src="/logo.svg" />
          </span>
        )}
        <div className="flex flex-col gap-2">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <Description className="text-light-secondary dark:text-dark-secondary">
            {description}
          </Description>
        </div>
      </div>
      <div className="inner:py-2 inner:font-bold flex flex-col gap-3">
        <button
          className={cn(
            "custom-button main-tab text-white",
            mainBtnClassName ??
              `bg-light-primary hover:bg-light-primary/90 focus-visible:bg-light-primary/90 active:bg-light-primary/80 dark:bg-light-border dark:text-light-primary dark:hover:bg-light-border/90 dark:focus-visible:bg-light-border/90 dark:active:bg-light-border/75`,
          )}
          onClick={action}
        >
          {mainBtnLabel}
        </button>
        <Button
          className={cn(
            "border border-light-line-reply dark:border-light-secondary dark:text-light-border",
            secondaryBtnClassName ??
              `text-neutral-800 hover:bg-light-primary/10 focus-visible:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 dark:active:bg-light-border/20`,
          )}
          onClick={closeModal}
        >
          {secondaryBtnLabel ?? "Cancel"}
        </Button>
      </div>
    </div>
  );
};
