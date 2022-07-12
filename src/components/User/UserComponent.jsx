import { useEffect, useState, useReducer, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DataContext from '../../DataContext';

function UserComponent(props) {
  const [user, setUser] = useState({});
  const { data } = useContext(DataContext);
  const { userId } = useParams();

  const {
    firstName,
    lastName,
    dob,
    email,
    houseName,
    street,
    town,
    county,
    postcode,
    countryName,
    sex,
    addressId,
    phoneNumbers,
  } = user;

  useEffect(() => {
    if (data.length > 1) {
      fetchUser(data);
    }
  }, [data]);

  const fetchUser = async (data) => {
    const findPersonGuid = data.find((item) => item.childEntityGuid === userId);
    const { childEntityGuid: personGuid } = findPersonGuid;
    const { data: user } = await axios.get(
      `/services/test/person/${personGuid}/`
    );
    setUser(user);
  };
  function checkEmail(email) {
    if (email) {
      const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
      return <>{email.match(regexEmail)}</>;
    } else {
      return <>N/D</>;
    }
  }
  return (
    <div className="p-4 max-w-2xl">
      <div className="bg-white space-y-3 p-4 rounded-lg shadow">
        <div className="text-sm">
          <div>
            <a href="#" className="text-blue-500 font-bold hover:underline">
              User Details
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Full name
            </span>
            <div className="my-2">{`${firstName} ${lastName}`}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              DOB
            </span>
            <div className="my-2">{dob}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Email
            </span>
            <div className="my-2">{checkEmail(email)}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              House Name
            </span>
            <div className="my-2">{houseName}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Street
            </span>
            <div className="my-2">{street}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Town
            </span>
            <div className="my-2">{town}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              County
            </span>
            <div className="my-2">{county}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Postcode
            </span>
            <div className="my-2">{postcode}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Country Name
            </span>
            <div className="my-2">{countryName}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Sex
            </span>
            <div className="my-2">{sex ?? 'N/D'}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Address ID
            </span>
            <div className="my-2">{addressId}</div>
          </div>
          <div className="text-sm text-gray-700">
            <span className="mr-2 text-xs font-medium uppercase tracking-wider text-green-800">
              Phone Numbers
            </span>
            <div className="my-2">
              {phoneNumbers &&
                phoneNumbers.map((phone) => {
                  return <div key={phone}>{phone}</div>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
