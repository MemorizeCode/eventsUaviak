// Button
export const Button = () => import('antd/es/button').then(m => m.default);
export type { ButtonProps } from 'antd/es/button';

// Card
export const Card = () => import('antd/es/card').then(m => m.default);
export type { CardProps } from 'antd/es/card';

// Input
export const Input = () => import('antd/es/input').then(m => m.default);
export type { InputProps } from 'antd/es/input';

// Space
export const Space = () => import('antd/es/space').then(m => m.default);
export type { SpaceProps } from 'antd/es/space';

// Typography
export const Typography = () => import('antd/es/typography').then(m => m.default);
export type { TypographyProps } from 'antd/es/typography';

// Select
export const Select = () => import('antd/es/select').then(m => m.default);
export type { SelectProps } from 'antd/es/select';

// Modal
export const Modal = () => import('antd/es/modal').then(m => m.default);
export type { ModalProps } from 'antd/es/modal';

// Form
export const Form = () => import('antd/es/form').then(m => m.default);
export type { FormProps } from 'antd/es/form';

// Upload
export const Upload = () => import('antd/es/upload').then(m => m.default);
export type { UploadProps, UploadFile } from 'antd/es/upload';

// Table
export const Table = () => import('antd/es/table').then(m => m.default);
export type { TableProps } from 'antd/es/table';

// Rate
export const Rate = () => import('antd/es/rate').then(m => m.default);
export type { RateProps } from 'antd/es/rate';

// Tag
export const Tag = () => import('antd/es/tag').then(m => m.default);
export type { TagProps } from 'antd/es/tag';

// Layout
export const Layout = () => import('antd/es/layout').then(m => m.default);
export type { LayoutProps } from 'antd/es/layout';

// Menu
export const Menu = () => import('antd/es/menu').then(m => m.default);
export type { MenuProps } from 'antd/es/menu';

// Drawer
export const Drawer = () => import('antd/es/drawer').then(m => m.default);
export type { DrawerProps } from 'antd/es/drawer';

// Row
export const Row = () => import('antd/es/row').then(m => m.default);
export type { RowProps } from 'antd/es/row';

// Col
export const Col = () => import('antd/es/col').then(m => m.default);
export type { ColProps } from 'antd/es/col';

// Message
export const message = () => import('antd/es/message').then(m => m.default); 