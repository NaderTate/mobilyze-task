import { FiChevronsRight } from 'react-icons/fi';
import useSideMenu from 'src/store/side-menu';

function ToggleButton() {
  const [isOpen, toggle] = useSideMenu((state) => [state.isOpen, state.toggle]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed z-30 top-5 left-5 p-3 bg-white rounded-md shadow-md"
    >
      <FiChevronsRight
        size={20}
        aria-label="Toggle side menu"
        className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

export default ToggleButton;
