import React, { useState } from "react";
import { ExampleContainer } from "../Shared/ExampleContainer";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Help, Info, Settings, User, Star, Heart, Download, Copy, Edit, Trash2 } from "lucide-react";
import { APITable, type APITableRow } from "../Shared/APITable";

const tooltipProps: APITableRow[] = [
  {
    property: "content",
    description: "The content to display in the tooltip.",
    type: "ReactNode",
    default: "-",
  },
  {
    property: "placement",
    description: "Position of the tooltip relative to the target element.",
    type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'",
    default: "'top'",
  },
  {
    property: "trigger",
    description: "How the tooltip is triggered.",
    type: "'hover' | 'focus' | 'click' | 'manual'",
    default: "'hover'",
  },
  {
    property: "delay",
    description: "Delay in milliseconds before showing the tooltip.",
    type: "number",
    default: "100",
  },
  {
    property: "hideDelay",
    description: "Delay in milliseconds before hiding the tooltip.",
    type: "number",
    default: "100",
  },
  {
    property: "disabled",
    description: "Whether the tooltip is disabled.",
    type: "boolean",
    default: "false",
  },
  {
    property: "visible",
    description: "Whether the tooltip is visible (controlled mode).",
    type: "boolean",
    default: "-",
  },
  {
    property: "defaultVisible",
    description: "Whether the tooltip is visible by default (uncontrolled mode).",
    type: "boolean",
    default: "false",
  },
  {
    property: "arrow",
    description: "Whether to show the tooltip arrow.",
    type: "boolean",
    default: "true",
  },
  {
    property: "offset",
    description: "Distance between tooltip and target element in pixels.",
    type: "number",
    default: "8",
  },
  {
    property: "portal",
    description: "Whether to render the tooltip in a portal (document.body).",
    type: "boolean",
    default: "true",
  },
  {
    property: "zIndex",
    description: "Z-index value for the tooltip.",
    type: "number",
    default: "9999",
  },
  {
    property: "maxWidth",
    description: "Maximum width of the tooltip.",
    type: "string | number",
    default: "250",
  },
