"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Select component family built on top of Radix UI Select primitives.
 * Provides a fully accessible dropdown selection interface with customizable styling.
 *
 * The select family consists of multiple components that work together:
 * - Select: Root component that manages state
 * - SelectTrigger: Clickable button that opens the dropdown
 * - SelectValue: Displays the currently selected value
 * - SelectContent: Container for the dropdown options
 * - SelectItem: Individual selectable options
 * - SelectGroup: Groups related options together
 * - SelectLabel: Labels for option groups
 * - SelectSeparator: Visual separators between groups
 * - SelectScrollUpButton/SelectScrollDownButton: Scroll controls for long lists
 */

/**
 * Root component for the Select dropdown. Manages the open/closed state and selection.
 * Wraps all other select components and provides the core functionality.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/select
 */
const Select = SelectPrimitive.Root

/**
 * Groups related SelectItem components together for better organization.
 * Useful for categorizing options in complex dropdowns.
 */
const SelectGroup = SelectPrimitive.Group

/**
 * Displays the currently selected value within the SelectTrigger.
 * Shows placeholder text when no value is selected.
 */
const SelectValue = SelectPrimitive.Value

/**
 * The clickable trigger button that opens the select dropdown.
 * Styled as a form input with a chevron icon indicating dropdown functionality.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Content including SelectValue
 * @returns {JSX.Element} The trigger button element
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Scroll up button for long select lists. Appears when content overflows upward.
 * Allows users to scroll through options that are above the visible area.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The scroll up button element
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * Scroll down button for long select lists. Appears when content overflows downward.
 * Allows users to scroll through options that are below the visible area.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The scroll down button element
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

/**
 * Container for the select dropdown content. Renders as a portal to avoid z-index issues.
 * Includes scroll buttons and viewport for displaying selectable items.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - SelectItem components and other content
 * @param {string} [props.position="popper"] - Positioning strategy ("popper" or "item-aligned")
 * @returns {JSX.Element} The dropdown content container
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * Label component for grouping select items. Provides semantic structure and styling.
 * Typically used to label sections within the select dropdown.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - The label text content
 * @returns {JSX.Element} The label element
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * Individual selectable option within the select dropdown.
 * Includes a checkmark indicator when selected and supports disabled states.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - The option text content
 * @param {string} props.value - The value associated with this option
 * @param {boolean} [props.disabled] - Whether this option is disabled
 * @returns {JSX.Element} The selectable option element
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * Visual separator between groups of select items.
 * Provides a horizontal line to distinguish different sections in the dropdown.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The separator element
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

/**
 * @example
 * ```tsx
 * import {
 *   Select,
 *   SelectContent,
 *   SelectItem,
 *   SelectTrigger,
 *   SelectValue,
 * } from "@/components/ui/select"
 *
 * // Basic single select
 * function BasicSelect() {
 *   return (
 *     <Select>
 *       <SelectTrigger className="w-[180px]">
 *         <SelectValue placeholder="Select a fruit" />
 *       </SelectTrigger>
 *       <SelectContent>
 *         <SelectItem value="apple">Apple</SelectItem>
 *         <SelectItem value="banana">Banana</SelectItem>
 *         <SelectItem value="orange">Orange</SelectItem>
 *       </SelectContent>
 *     </Select>
 *   )
 * }
 *
 * // Grouped select with labels and separators
 * function GroupedSelect() {
 *   return (
 *     <Select>
 *       <SelectTrigger className="w-[280px]">
 *         <SelectValue placeholder="Select a programming language" />
 *       </SelectTrigger>
 *       <SelectContent>
 *         <SelectGroup>
 *           <SelectLabel>Web Languages</SelectLabel>
 *           <SelectItem value="javascript">JavaScript</SelectItem>
 *           <SelectItem value="typescript">TypeScript</SelectItem>
 *           <SelectItem value="html">HTML</SelectItem>
 *         </SelectGroup>
 *         <SelectSeparator />
 *         <SelectGroup>
 *           <SelectLabel>Backend Languages</SelectLabel>
 *           <SelectItem value="python">Python</SelectItem>
 *           <SelectItem value="java">Java</SelectItem>
 *           <SelectItem value="go">Go</SelectItem>
 *         </SelectGroup>
 *       </SelectContent>
 *     </Select>
 *   )
 * }
 * ```
 */

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
