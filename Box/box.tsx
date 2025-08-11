import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Box } from "./Box";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";
import { Input } from "../Input/Input";
import { APITable, type APITableRow } from "../Shared/APITable";
import { Heart, Star, Users, Mail, Settings, ChevronRight } from "lucide-react";

const boxProps: APITableRow[] = [
  {
    property: "as",
    description: "The HTML element to render as.",
    type: "keyof JSX.IntrinsicElements",
    default: "'div'",
  },
  {
    property: "p",
    description: "Padding on all sides.",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "px",
    description: "Horizontal padding (left and right).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "py",
    description: "Vertical padding (top and bottom).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "pt | pr | pb | pl",
    description: "Individual padding sides (top, right, bottom, left).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none'",
    default: "-",
  },
  {
    property: "m",
    description: "Margin on all sides.",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "mx",
    description: "Horizontal margin (left and right).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "my",
    description: "Vertical margin (top and bottom).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "mt | mr | mb | ml",
    description: "Individual margin sides (top, right, bottom, left).",
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none' | 'auto'",
    default: "-",
  },
  {
    property: "bg",
    description: "Background color variant.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'surface' | 'muted' | 'transparent'",
    default: "-",
  },
  {
    property: "border",
    description: "Border style.",
    type: "'none' | 'solid' | 'dashed' | 'dotted'",
    default: "-",
  },
  {
    property: "borderColor",
    description: "Border color variant.",
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'border' | 'muted'",
    default: "-",
  },
  {
    property: "borderWidth",
    description: "Border width.",
    type: "'thin' | 'medium' | 'thick'",
    default: "'thin'",
  },
  {
    property: "borderRadius",
    description: "Border radius size.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "-",
  },
  {
    property: "shadow",
    description: "Box shadow size.",
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "-",
  },
  {
    property: "overflow",
    description: "Overflow behavior.",
    type: "'visible' | 'hidden' | 'scroll' | 'auto'",
    default: "-",
  },
  {
    property: "position",
    description: "CSS position property.",
    type: "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'",
    default: "-",
  },
  {
    property: "display",
    description: "CSS display property.",
    type: "'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'",
    default: "-",
  },
  {
    property: "width",
    description: "Box width.",
    type: "string | number",
    default: "-",
  },
  {
    property: "height",
    description: "Box height.",
    type: "string | number",
    default: "-",
  },
  {
    property: "minWidth",
    description: "Minimum width constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "minHeight",
    description: "Minimum height constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "maxWidth",
    description: "Maximum width constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "maxHeight",
    description: "Maximum height constraint.",
    type: "string | number",
    default: "-",
  },
  {
    property: "className",
    description: "Additional class name for the box.",
    type: "string",
    default: "-",
  },
  {
    property: "style",
    description: "Inline style for the box.",
    type: "React.CSSProperties",
    default: "-",
  },
  {
    property: "children",
    description: "Content to render inside the box.",
    type: "ReactNode",
    default: "-",
  },
];

export const BoxDocs: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardVariant, setCardVariant] = useState<'surface' | 'primary' | 'success'>('surface');

  const nextVariant = () => {
    const variants: Array<'surface' | 'primary' | 'success'> = ['surface', 'primary', 'success'];
    const currentIndex = variants.indexOf(cardVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setCardVariant
