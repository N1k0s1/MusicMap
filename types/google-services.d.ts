declare module "*.json" {
  const value: {
    project_info: {
      project_id: string;
    };
    client: Array<{
      api_key: Array<{
        current_key: string;
      }>;
      client_info: {
        mobilesdk_app_id: string;
      };
    }>;
  };
  export default value; 
} 