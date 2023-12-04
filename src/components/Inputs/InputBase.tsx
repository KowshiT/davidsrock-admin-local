export interface TextFieldProps {
  className?: string;
  children: React.ReactNode;
}

const InputBase: React.FC<TextFieldProps> = (props) => {
  return ( 
      <div className={`inputBase ${props.className}`}>
        {props.children}
      </div>
   );
}

export default InputBase;