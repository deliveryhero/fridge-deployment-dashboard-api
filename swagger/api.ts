import {Accept, GET, Path, PathParam, POST} from 'typescript-rest';
import {Produces, Response, Security, Tags} from 'typescript-rest-swagger';
import {ErrorResponse} from '../src/model/http/ErrorResponse';
import {Deployment} from '../src/model/Deployment';
import {ListEnvironmentsResponse} from '../src/model/http/ListEnvironmentsResponse';
import {ListDeploymentsResponse} from '../src/model/http/ListDeploymentsResponse';

@Path('/deployments')
@Accept('application/json')
@Produces('application/json')
@Security('bearer')
export class Deployments {

  /**
   * @summary Insert a new deployment
   */
  @Response<void>(204)
  @Response<ErrorResponse>(400)
  @Response<ErrorResponse>(401)
  @Response<ErrorResponse>(500)
  @POST
  @Tags('deployments')
  addDeployment(_deployment: Deployment): void {
  }


  /**
   * @summary List all environments for each team
   */
  @Response<ListEnvironmentsResponse>(200)
  @Response<ErrorResponse>(400)
  @Response<ErrorResponse>(401)
  @Response<ErrorResponse>(500)
  @GET
  @Path('/:teamName')
  @Tags('list-environments-response')
  listEnvironments(@PathParam('teamName') _teamName: string): ListEnvironmentsResponse {
    return null;
  }

  /**
   * @summary List all deployments for each application under team environment
   */
  @Response<ListDeploymentsResponse>(200)
  @Response<ErrorResponse>(400)
  @Response<ErrorResponse>(401)
  @Response<ErrorResponse>(500)
  @GET
  @Path('/:teamName/:environmentName')
  @Tags('list-deployments-response')
  listDeploymentsResponse(@PathParam('teamName') _teamName: string,
                          @PathParam('environmentName') _environmentName: string): ListDeploymentsResponse {
    return null;
  }
}

